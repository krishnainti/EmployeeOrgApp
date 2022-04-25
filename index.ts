import { EmployeeOrgApp } from "./src/EmployeeOrg";
import { EmployeeOrgData } from "./src/data";

const app = new EmployeeOrgApp(EmployeeOrgData);

// Test 1
console.time("test1");

app.move(12, 5);
app.undo();
app.redo();

console.timeEnd("test1");

// Test 2
/* 
    app.move(12, 5);
    app.move(15, 5);
    app.undo();
    app.undo();
*/

console.log(JSON.stringify(app.ceo, undefined, 2));
