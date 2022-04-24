export interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

export interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeId: number, supervisorID: number): void;
  undo(): void;
  redo(): void;
}

export interface MoveTrack {
  fromId: number;
  employeeId: number;
  toId: number;
  subordinateIds: number[];
}
