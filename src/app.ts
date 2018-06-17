import { PackageDependencyTable } from './lens/package-dependency-table';

export class PackageLens {
  private table: PackageDependencyTable = new PackageDependencyTable();
  public add(obj: any) {
    this.table.addPackageFromJsonObject(obj);
  }

  printPackageTable() {
    console.log('============ Package Table ============');
    console.log(this.table.getPackageTable());
  }
  printDependencyTable() {
    console.log('============ Dependency Table ============');
    console.log(this.table.getDependencyTable());
  }
  printDevDependencyTable() {
    console.log('============ Dev Dependency Table ============');
    console.log(this.table.getDevDependencyTable());
  }
}
