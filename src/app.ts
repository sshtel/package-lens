import { PackageDependencyTable } from './lens/package-dependency-table';

export class PackageLens {
  private table: PackageDependencyTable = new PackageDependencyTable();
  public add(obj: any) {
    this.table.addPackageFromJsonObject(obj);
  }

  printPackageTable() {
    this.table.printPackageTable();
  }

  printDependencies() {
    this.table.printDependencies();
  }
  printDevDependencies() {
    this.table.printDependencies();
  }
}
