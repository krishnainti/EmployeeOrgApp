import { EmployeeOrgBase } from "./EmployeeOrgBase";
import { Employee, IEmployeeOrgApp } from "./contract";

export class EmployeeOrgApp extends EmployeeOrgBase implements IEmployeeOrgApp {
  constructor(employee: Employee) {
    super(employee);
  }

  move(employeeId: number, supervisorID: number): void {
    this.movingEmployee = null;

    let employeeParent = this.getParent(employeeId);

    this.movePosition(employeeId, supervisorID);

    const subordinateIds = employeeParent.subordinates
      .find((employee) => employee.uniqueId === employeeId)
      ?.subordinates?.map((i) => i.uniqueId);

    this.undos.push({
      fromId: employeeParent.uniqueId,
      employeeId,
      toId: supervisorID,
      subordinateIds,
    });
  }

  undo(): void {
    const { toId, fromId, employeeId, subordinateIds } = this.undos.pop();
    this.undoPosition(employeeId, fromId, subordinateIds);
    this.redos.push({
      fromId: toId,
      employeeId,
      toId: fromId,
      subordinateIds,
    });
  }

  redo(): void {
    const { toId, fromId, employeeId, subordinateIds } = this.redos.pop();
    this.movePosition(employeeId, fromId);
    this.undos.push({
      fromId: toId,
      employeeId,
      toId: fromId,
      subordinateIds,
    });
  }
}
