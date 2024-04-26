{
  description = "My personal website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_21;
      in
      {
        packages = rec {
          default = pkgs.stdenv.mkDerivation {
            name = "www";
            src = ./.;

            buildInputs = [
              nodejs
              installNodeModules
            ];

            buildPhase = ''
              mkdir $out
              cp -a ./. $out/
              cd $out
              installNodeModules
              npm run build
            '';
          };

          installNodeModules = pkgs.writeShellApplication {
            name = "installNodeModules";

            text = ''
              test -d node_modules && rm -rf node_modules
              cp -a ${nodeModules}/lib/node_modules/. node_modules/
              chmod 775 -R node_modules
            '';
          };

          deployToGithubContainerRegistry = pkgs.writeShellApplication {
            name = "deployToGithubContainerRegistry";

            runtimeInputs = [ pkgs.docker ];

            text = ''
              docker load -i ${container}
              docker tag rayliwell/www ghcr.io/rayliwell/www
              echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin
              docker image push ghcr.io/rayliwell/www:latest
            '';
          };

          deployToDockerContainerRegistry = pkgs.writeShellApplication {
            name = "deployToDockerContainerRegistry";

            runtimeInputs = [ pkgs.docker ];

            text = ''
              docker load -i ${container}
              echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
              docker image push rayliwell/www:latest
            '';
          };

          deployToCloudflareWorkers = pkgs.writeShellApplication {
            name = "deployToCloudflareWorkers";

            runtimeInputs = [ nodeModules ];

            text = ''
              cd "$(mktemp -d)"
              cp -a ${default}/. ./
              chmod 775 -R .
              wrangler pages deploy --project-name www dist
            '';
          };

          lint = pkgs.writeShellApplication {
            name = "lint";

            runtimeInputs = [
              nodeModules
              installNodeModules
            ];

            text = ''
              installNodeModules
              prettier ./ --check
              eslint ./src
            '';
          };

          nodeModules = pkgs.buildNpmPackage {
            name = "node_modules";
            src = ./.;

            buildInputs = [ nodejs ];

            npmDepsHash = "sha256-Kc3w8yplbDdOvMQk6GYg8NGLxPKAOysKSXEbl/BPIlo=";
            dontNpmBuild = true;
            installPhase = ''
              mkdir -p $out/lib/node_modules
              cp -a ./node_modules/. $out/lib/node_modules/
              ln -s $out/lib/node_modules/.bin $out/bin
            '';
          };

          container = pkgs.dockerTools.buildLayeredImage {
            name = "rayliwell/www";
            tag = "latest";

            contents = pkgs.buildEnv {
              name = "www";

              paths = [
                nodejs
                pkgs.bash
              ];

              pathsToLink = [
                "/bin"
                "/lib"
              ];
            };

            extraCommands = ''
              cp -a ${default}/. app/
              chmod 775 -R app
            '';

            config = {
              WorkingDir = "/app";

              Cmd = [
                "npm"
                "run"
                "start"
              ];
            };
          };
        };

        devShells = {
          default = pkgs.mkShell { buildInputs = [ nodejs ]; };
        };
      }
    );
}
