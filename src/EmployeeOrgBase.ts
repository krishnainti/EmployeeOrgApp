import { Employee, MoveTrack } from "./contract";
import { cloneDeep } from "./utils";

export class EmployeeOrgBase {
  protected movingEmployee: Employee;
  public ceo: Employee;
  protected undos: MoveTrack[] = [];
  protected redos: MoveTrack[] = [];

  constructor(employee: Employee) {
    this.ceo = employee;
  }

  protected findMovingEmployee(employeeId: number) {
    let parent: Employee;
    const traverse = (employee: Employee) => {
      if (employeeId === employee.uniqueId) {
        parent.subordinates = (parent?.subordinates || [])
          .filter((subordinate) => subordinate.uniqueId != employeeId)
          .concat(employee.subordinates);
        employee.subordinates = [];
        this.movingEmployee = employee;
      }

      for (const subordinateEmployee of employee.subordinates) {
        parent = employee;
        traverse(subordinateEmployee);
      }
      return employee;
    };
    traverse(this.ceo);
  }

  protected movePosition(employeeId: number, supervisorID: number): void {
    const placeTheMovingEmployee = (employee: Employee) => {
      if (supervisorID === employee.uniqueId && this.movingEmployee) {
        employee.subordinates.push(this.movingEmployee);
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
        const subordinatesObject = employee.subordinates.reduce(
          (acc, item) => {
            if (subordinateIds.includes(item.uniqueId))
              acc.movingEmployeeSubordinates.push(item);
            else acc.employeeSubordinates.push(item);
            return acc;
          },
          { movingEmployeeSubordinates: [], employeeSubordinates: [] }
        );

        this.movingEmployee.subordinates =
          subordinatesObject.movingEmployeeSubordinates;

        subordinatesObject.employeeSubordinates.push(this.movingEmployee);

        employee.subordinates = subordinatesObject.employeeSubordinates;
      }
      for (const subordinateEmployee of employee.subordinates) {
        placeTheMovingEmployee(subordinateEmployee);
      }
      return employee;
    };

    this.findMovingEmployee(employeeId);
    placeTheMovingEmployee(this.ceo);
  }

  protected getParent(id: number): Employee {
    let parent: Employee;
    const traverse = (employee: Employee) => {
      if (employee.subordinates.map((item) => item.uniqueId).includes(id)) {
        parent = cloneDeep(employee);
      }

      for (const subordinateEmployee of employee.subordinates) {
        traverse(subordinateEmployee);
      }
    };

    traverse(this.ceo);

    return parent;
  }
}
