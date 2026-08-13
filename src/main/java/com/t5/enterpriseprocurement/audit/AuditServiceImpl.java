package com.t5.enterpriseprocurement.audit;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

@Service
public class AuditServiceImpl implements AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public void log(String username,
                    String action,
                    String module) {

        AuditLog auditLog =
                new AuditLog(
                        username,
                        action,
                        module,
                        LocalDateTime.now());

        auditLogRepository.save(auditLog);
    }
}