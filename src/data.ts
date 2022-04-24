import { Employee } from "./contract";

export const EmployeeOrgData: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 2,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 6,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 11,
              name: "Mary Blue",
              subordinates: [],
            },
            {
              uniqueId: 12,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 14,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 15,
                      name: "Will Turner",
                      subordinates: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      uniqueId: 3,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 7,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 13,
              name: "Thomas Brown",
              subordinates: [],
            },
          ],
        },
        {
          uniqueId: 8,
          name: "George Carrey",
          subordinates: [],
        },
        {
          uniqueId: 9,
          name: "Gary Styles",
          subordinates: [],
        },
      ],
    },
    {
      uniqueId: 4,
      name: "Bruce Willis",
      subordinates: [],
    },
    {
      uniqueId: 5,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 10,
          name: "Sophie Turner",
          subordinates: [],
        },
      ],
    },
  ],
};
