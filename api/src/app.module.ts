import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { PositionsModule } from './positions/positions.module';
import { DepartmentsModule } from './departments/departments.module';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }