import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organizations.entity';
import { Policy } from './entities/policy.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import { UserRoleMap } from './entities/user-role-map.entity';
import { OrganizationsController } from './controllers/organizations.controller';
import { PolicyController } from './controllers/policy.controller';
import { RoleController } from './controllers/role.controller';
import { UsersController } from './controllers/users.controller';
import { UserRoleMapController } from './controllers/user-role-map.controller';
import { OrganizationsService } from './services/organizations.service';
import { PolicyService } from './services/policy.service';
import { UsersService } from './services/users.service';
import { RoleService } from './services/role.service';
import { UserRoleMapService } from './services/user-role-map.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, Policy, Role, User, UserRoleMap]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    OrganizationsController,
    PolicyController,
    RoleController,
    UsersController,
    UserRoleMapController,
  ],
  providers: [
    OrganizationsService,
    PolicyService,
    UsersService,
    RoleService,
    UserRoleMapService,
  ],
  exports: [
    OrganizationsService,
    PolicyService,
    UsersService,
    RoleService,
    UserRoleMapService,
  ],
})
export class AuthModule {}
