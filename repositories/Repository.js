import PersonalType from '@/repositories/PersonalTypeRepository'
import Covid from '@/repositories/CovidRepository'
import PreRegister from '@/repositories/PreRegisterRepository'
import AreaZone from '@/repositories/AreaZoneRepository'
import ObjectiveWork from '@/repositories/ObjectiveWorkRepository'
import TimeWork from '@/repositories/TimeWorkRepository'
import HistoryRepository from '@/repositories/HistoryRepository'
import RequireFields from '@/repositories/RequireFieldsRepository'
import Position from '@/repositories/PositionRepository'
import PISInterfaceRepository from '@/repositories/PISInterfaceRepository'
import AccessControlInterfaceRepository from '@/repositories/AccessControlInterfaceRepository'
import SafetyTrainingRepository from '@/repositories/SafetyTrainingRepository'
import VisitorRepository from '@/repositories/VisitorRepository'
import RolePermissionRepository from '@/repositories/RolePermissionRepository'
import UserManagementRepository from '@/repositories/UserManagementRepository'
import MapRepository from '@/repositories/MapRepository'
import PDPARepository from '@/repositories/PDPARepository'
export default ({ $axios, app }) => ({
  personalType: PersonalType($axios),
  covid: Covid($axios),
  preRegister: PreRegister($axios),
  areaZone: AreaZone($axios),
  objectiveWork: ObjectiveWork($axios),
  timeWork: TimeWork($axios),
  history: HistoryRepository($axios),
  RequireFields: RequireFields($axios),
  position: Position($axios),
  accessControlInterfaceRepository: AccessControlInterfaceRepository($axios),
  PISInterfaceRepository: PISInterfaceRepository($axios, app),
  safetyTrainingRepository: SafetyTrainingRepository($axios),
  visitorRepository: VisitorRepository($axios),
  rolePermissionRepository: RolePermissionRepository($axios),
  userManagementRepository: UserManagementRepository($axios),
  mapRepository: MapRepository($axios),
  pdpaRepository: PDPARepository($axios),
})
