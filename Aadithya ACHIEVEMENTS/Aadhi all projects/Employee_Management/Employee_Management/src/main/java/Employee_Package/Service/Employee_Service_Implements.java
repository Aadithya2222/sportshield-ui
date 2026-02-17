package Employee_Package.Service;

import Employee_Package.DTO.Employee_DTO;
import Employee_Package.Entity.EmployeeEntity;
import Employee_Package.Repository.Employee_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Employee_Service_Implements implements Employee_Service {
    @Autowired
    private Employee_Repository callthequery;
    @Override

    public EmployeeEntity Register(Employee_DTO employee_dto){
        EmployeeEntity savethedata = new EmployeeEntity(employee_dto.getEmployee_name(),employee_dto.getEmployee_id(),employee_dto.getPassword(),employee_dto.getDepartment(),employee_dto.getAge(),employee_dto.getCompany_name());
        return callthequery.save(savethedata);
    }

}
