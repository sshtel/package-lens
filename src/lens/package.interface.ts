
export type Package = {
  name: string;
  version: string;
  description?: string;
  repository?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

export type DependencyPackage = {
  name: string;
  referredBy: { [key: string]: string };  // {key} package depends on {value} package
  versionFragment: number;
};
