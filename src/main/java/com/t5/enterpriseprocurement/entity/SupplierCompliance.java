package com.t5.enterpriseprocurement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "supplier_compliance")
public class SupplierCompliance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compliance_id")
    private Integer complianceId;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Column(name = "gst_verified")
    private Boolean gstVerified;

    @Column(name = "pan_verified")
    private Boolean panVerified;

    @Column(name = "iso_certified")
    private Boolean isoCertified;

    @Column(name = "license_expiry")
    private LocalDate licenseExpiry;

    @Column(name = "compliance_status")
    private String complianceStatus;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public SupplierCompliance() {
    }

    public Integer getComplianceId() {
        return complianceId;
    }

    public void setComplianceId(Integer complianceId) {
        this.complianceId = complianceId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Boolean getGstVerified() {
        return gstVerified;
    }

    public void setGstVerified(Boolean gstVerified) {
        this.gstVerified = gstVerified;
    }

    public Boolean getPanVerified() {
        return panVerified;
    }

    public void setPanVerified(Boolean panVerified) {
        this.panVerified = panVerified;
    }

    public Boolean getIsoCertified() {
        return isoCertified;
    }

    public void setIsoCertified(Boolean isoCertified) {
        this.isoCertified = isoCertified;
    }

    public LocalDate getLicenseExpiry() {
        return licenseExpiry;
    }

    public void setLicenseExpiry(LocalDate licenseExpiry) {
        this.licenseExpiry = licenseExpiry;
    }

    public String getComplianceStatus() {
        return complianceStatus;
    }

    public void setComplianceStatus(String complianceStatus) {
        this.complianceStatus = complianceStatus;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}