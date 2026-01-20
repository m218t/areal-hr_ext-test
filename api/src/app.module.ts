import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { PositionsModule } from './positions/positions.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeFileModule } from './modules/employee-file/employee-file.module';
import { PersonnelOperationModule } from './modules/personnel-operation/personnel-operation.module';
import { ChangeHistoryModule } from './modules/change-history/change-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'areal_hr',
      autoLoadEntities: true,
      synchronize: false,
    }),
    OrganizationsModule,
    PositionsModule,
    DepartmentsModule,
    EmployeeModule,
    EmployeeFileModule,
    PersonnelOperationModule,
    ChangeHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}