package com.t5.enterpriseprocurement.audit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Integer> {

}