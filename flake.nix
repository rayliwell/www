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
      in
      {
        packages = rec {
          default = pkgs.buildNpmPackage {
            name = "www";
            src = ./.;

            buildInputs = [ pkgs.nodejs_18 ];

            npmDepsHash = "sha256-gLRr3Vru1Fot3HMllid9PITP6hJQIv+MAxNjpJblmJE=";

            buildPhase = ''
              mkdir -p $out/app
              cp -r . $out/app
              cd $out/app
              npm run build
              ln -s $out/app/node_modules/.bin $out/bin
            '';
          };

          docker = pkgs.dockerTools.buildImage {
            name = "www";
            tag = "latest";
            copyToRoot = pkgs.buildEnv {
              name = "www";
              paths = [
                default
                pkgs.bash
                pkgs.nodejs_18
              ];
              pathsToLink = [
                "/bin"
                "/lib"
                "/app"
              ];
            };
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
      }
    );
}
