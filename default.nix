{
  lib,
  config,
  gitignore,
  dream2nix,
  ...
}:
{
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  mkDerivation = {
    src = let
      gitignoreSrc = config.deps.fetchFromGitHub { 
        owner = "hercules-ci";
        repo = "gitignore.nix";
        rev = "637db329424fd7e46cf4185293b9cc8c88c95394";
        sha256 = "sha256-HG2cCnktfHsKV0s4XW83gU3F57gaTljL9KNSuG6bnQs=";
      };
    inherit (import gitignoreSrc { inherit lib; }) gitignoreSource;
    in
      gitignoreSource ./.;
  };

  deps =
  { nixpkgs, ... }:
  {
    inherit (nixpkgs) fetchFromGitHub stdenv;
  };

  nodejs-package-lock-v3 = {
    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  };

  name = "www";
  version = "0.0.1";
}
