package Employee_Package.Repository;

import Employee_Package.Entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository


public interface Employee_Repository extends JpaRepository<EmployeeEntity,Long> {

}
