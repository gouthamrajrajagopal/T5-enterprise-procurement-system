package com.t5.enterpriseprocurement.dto;

public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private String phone;
    private Integer departmentId;
    private Integer roleId;

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String name,
                              String email,
                              String password,
                              String phone,
                              Integer departmentId,
                              Integer roleId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.departmentId = departmentId;
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Override
    public String toString() {
        return "RegisterRequestDTO [name=" + name +
                ", email=" + email +
                ", phone=" + phone +
                ", departmentId=" + departmentId +
                ", roleId=" + roleId + "]";
    }
}