package Employee_Package.Entity;

import jakarta.persistence.*;
import org.hibernate.mapping.Value;

@Entity
@Table(name = "salaryinfo")
public class SalaryEnitity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String employee_id;
    private String employee_name;
    private String department;
    private String employee_salary;
    
}
