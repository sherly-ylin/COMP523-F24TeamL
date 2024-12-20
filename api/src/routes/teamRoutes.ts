import { Router } from 'express'
import { TeamController } from '../controllers/teamController'

const router = Router()
const teamController = new TeamController()

router.post('/', (req, res) => teamController.createTeam(req, res))
router.put('/:id', (req, res) => teamController.updateTeam(req, res))
router.get('/:id', (req, res) => teamController.getTeam(req, res))
router.delete('/:id', (req, res) => teamController.deleteTeam(req, res))

export default router
