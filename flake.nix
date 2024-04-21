{
  description = "My personal website";

  inputs = {
    dream2nix.url = "github:nix-community/dream2nix";
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };

  outputs =
    inputs@{
      self,
      dream2nix,
      nixpkgs,
      ...
    }:
    let
      system = "x86_64-linux";
    in
    {
      packages.${system}.default = dream2nix.lib.evalModules {
        packageSets.nixpkgs = inputs.dream2nix.inputs.nixpkgs.legacyPackages.${system};
        modules = [
          ./default.nix
          {
            paths.projectRoot = ./.;
            paths.projectRootFile = "flake.nix";
            paths.package = ./.;
          }
        ];
      };
    };
}
