import { Employee } from './employees/models/employee';

export const ROOT_PATH = 'atos';
export const DOCUMENT_MANAGEMENT_SERVICES_PATH = 'http://localhost:8080/api/v1/document-management-services/document';
export const EMPLOYEE_SERVICES_PATH = 'http://localhost:8081/api/v1/employee-services/employees';
export const EMPLOYEES: Employee[] = [
  {
    employeeId: 'uuId-1-1',
    das: 'A000000',
    cin: 'BE000000',
    firstName: 'Amine',
    lastName: 'Amine',
    cnssNumber: '123456789',
    position: 'Application Developer',
    integrationDate: '2023-1-1',
    releaseDate: '2024-1-1',
    grossMonthlySalary: 20000,
    bankAccountNumber: '000000000000',
  },
  {
    employeeId: 'uuId-1-2',
    das: 'A000000',
    cin: 'BE000000',
    firstName: 'Omar',
    lastName: 'Omar',
    cnssNumber: '123456789',
    position: 'Application Developer',
    integrationDate: '2023-1-1',
    releaseDate: '2024-1-1',
    grossMonthlySalary: 20000,
    bankAccountNumber: '000000000000',
  },
  {
    employeeId: 'uuId-1-3',
    das: 'A000003',
    cin: 'BE000003',
    firstName: 'Anas',
    lastName: 'Anas',
    cnssNumber: '123456789',
    position: 'Application Developer',
    integrationDate: '2023-1-1',
    releaseDate: '2024-1-1',
    grossMonthlySalary: 20000,
    bankAccountNumber: '000000000000',
  }
];
