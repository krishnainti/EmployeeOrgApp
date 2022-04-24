import { Employee, MoveTrack } from "./contract";

export class EmployeeOrgBase {
  protected movingEmpSubordinates: Employee[];
  protected movingEmployee: Employee;
  protected parentEmployee: Employee;
  public ceo: Employee;
  protected undos: MoveTrack[] = [];
  protected redos: MoveTrack[] = [];

  constructor(employee: Employee) {
    this.ceo = employee;
  }

  protected findMovingEmployee(employeeId: number) {
    const traverse = (employee: Employee) => {
      for (const subordinateEmployee of employee.subordinates) {
        if (employeeId === subordinateEmployee.uniqueId) {
          this.movingEmpSubordinates = subordinateEmployee.subordinates;
          subordinateEmployee.subordinates = [];
          employee.subordinates = [
            ...(employee.subordinates || []).filter(
              (subordinate) => subordinate.uniqueId != employeeId
            ),
            ...this.movingEmpSubordinates,
          ];
          this.parentEmployee = employee;
          this.movingEmployee = subordinateEmployee;
        }
        traverse(subordinateEmployee);
      }
      return employee;
    };
    traverse(this.ceo);
  }

  protected movePosition(employeeId: number, supervisorID: number): void {
    const placeTheMovingEmployee = (employee: Employee) => {
      if (supervisorID === employee.uniqueId && this.movingEmployee) {
        employee.subordinates = [...employee.subordinates, this.movingEmployee];
      }
      for (const subordinateEmployee of employee.subordinates) {
        placeTheMovingEmployee(subordinateEmployee);
      }
      return employee;
    };

    this.findMovingEmployee(employeeId);
    placeTheMovingEmployee(this.ceo);
  }

  protected undoPosition(
    employeeId: number,
    supervisorID: number,
    subordinateIds: number[]
  ): void {
    const placeTheMovingEmployee = (employee: Employee) => {
      if (supervisorID === employee.uniqueId && this.movingEmployee) {
        this.movingEmployee.subordinates = employee.subordinates?.filter(
          (item) => subordinateIds.includes(item.uniqueId)
        );

        employee.subordinates = [
          ...employee.subordinates?.filter(
            (item) => !subordinateIds.includes(item.uniqueId)
          ),
          this.movingEmployee,
        ];
      }
      for (const subordinateEmployee of employee.subordinates) {
        placeTheMovingEmployee(subordinateEmployee);
      }
      return employee;
    };

    this.findMovingEmployee(employeeId);
    placeTheMovingEmployee(this.ceo);
  }
}
