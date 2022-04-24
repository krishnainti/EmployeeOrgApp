import { EmployeeOrgBase } from "./EmployeeOrgBase";
import { Employee, IEmployeeOrgApp } from "./contract";

export class EmployeeOrgApp extends EmployeeOrgBase implements IEmployeeOrgApp {
  constructor(employee: Employee) {
    super(employee);
  }

  move(employeeId: number, supervisorID: number): void {
    this.parentEmployee = null;
    this.movingEmployee = null;
    this.movingEmpSubordinates = [];

    this.movePosition(employeeId, supervisorID);

    this.undos.push({
      fromId: this.parentEmployee.uniqueId,
      employeeId,
      toId: supervisorID,
      subordinateIds: this.movingEmpSubordinates.map((item) => item.uniqueId),
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
