"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user.entity");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_entity_1.UserRoles, {
        message: `role must be one of: ${Object.values(user_entity_1.UserRoles).join(', ')}`,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((user) => user.role !== user_entity_1.UserRoles.ADMIN),
    (0, class_validator_1.IsNotEmpty)({ message: 'any user must have a boss' }),
    __metadata("design:type", user_entity_1.User)
], CreateUserDto.prototype, "boss", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((user) => user.role === user_entity_1.UserRoles.BOSS),
    (0, class_validator_1.IsArray)({ message: 'subordinates must be array' }),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Boss must have at least 1 subordinate' }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "subordinates", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.Length)(4, 20, {
        message: 'Password length must be in between 4 and 20 symbols',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map