var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/auth');
var userController = require('../controllers/userController');

// ? User Routes //
router.post('/register', userController.register);
router.post('/login', passport.authenticate('local'), userController.signIn);

// TODO: category
router.get(
	'/category/single/:id',
	authenticate.verifyUser,
	userController.getSingleCategory
);
router.get(
	'/category/all',
	authenticate.verifyUser,
	userController.getAllCategories
);
router.post(
	'/category/add',
	authenticate.verifyUser,
	userController.addCategory
);
router.patch(
	'/category/edit/:id',
	authenticate.verifyUser,
	userController.editCategory
);
router.delete(
	'/category/delete/:id',
	authenticate.verifyUser,
	userController.deleteCategory
);

// TODO: pettycash
router.get(
	'/cash/single/:id',
	authenticate.verifyUser,
	userController.getSingleCash
);
router.get(
	'/cash/all',
	authenticate.verifyUser,
	userController.getAllPettyCash
);
router.post('/cash/add', authenticate.verifyUser, userController.addCash);
router.patch(
	'/cash/edit/:id',
	authenticate.verifyUser,
	userController.editPettyCash
);
router.delete(
	'/cash/delete/:id',
	authenticate.verifyUser,
	userController.deletePettyCash
);

// TODO: energy
router.get(
	'/energy/single/:id',
	authenticate.verifyUser,
	userController.getSingleEnergy
);
router.get('/energy/all', authenticate.verifyUser, userController.getAllEnergy);
router.post('/energy/add', authenticate.verifyUser, userController.addEnergy);
router.patch(
	'/energy/edit/:id',
	authenticate.verifyUser,
	userController.editEnergy
);
router.delete(
	'/energy/delete/:id',
	authenticate.verifyUser,
	userController.deleteEnergy
);

// TODO: package
router.get(
	'/package/single/:id',
	authenticate.verifyUser,
	userController.getSinglePackage
);
router.get(
	'/package/all',
	authenticate.verifyUser,
	userController.getAllPackages
);
router.post('/package/add', authenticate.verifyUser, userController.addPackage);
router.patch(
	'/package/edit/:id',
	authenticate.verifyUser,
	userController.editPackage
);
router.delete(
	'/package/delete/:id',
	authenticate.verifyUser,
	userController.deletePackage
);

// TODO: vendor
router.get(
	'/vendor/single/:id',
	authenticate.verifyUser,
	userController.getSingleVendor
);
router.get(
	'/vendor/all',
	authenticate.verifyUser,
	userController.getAllVendors
);
router.post('/vendor/add', authenticate.verifyUser, userController.addVendor);
router.patch(
	'/vendor/edit/:id',
	authenticate.verifyUser,
	userController.editVendor
);
router.delete(
	'/vendor/delete/:id',
	authenticate.verifyUser,
	userController.deleteVendor
);

// TODO: team
router.get(
	'/team/single/:id',
	authenticate.verifyUser,
	userController.getSingleTeam
);
router.get('/team/all', authenticate.verifyUser, userController.getAllTeams);
router.post('/team/add', authenticate.verifyUser, userController.addTeam);
router.patch(
	'/team/edit/:id',
	authenticate.verifyUser,
	userController.editTeam
);
router.delete(
	'/team/delete/:id',
	authenticate.verifyUser,
	userController.deleteTeam
);

// TODO: member
router.get(
	'/member/single/:id',
	authenticate.verifyUser,
	userController.getSingleMember
);
router.get(
	'/member/all',
	authenticate.verifyUser,
	userController.getAllMembers
);
router.get(
	'/member/team/:id',
	authenticate.verifyUser,
	userController.getMembersByTeam
);
router.post('/member/add', authenticate.verifyUser, userController.addMember);
router.patch(
	'/member/edit/:id',
	authenticate.verifyUser,
	userController.editMember
);
router.delete(
	'/member/delete/:id',
	authenticate.verifyUser,
	userController.deleteMember
);

// TODO: invoice
router.get(
	'/invoice/single/:id',
	authenticate.verifyUser,
	userController.getSingleInvoice
);
router.get(
	'/invoice/all',
	authenticate.verifyUser,
	userController.getAllInvoices
);
router.post('/invoice/add', authenticate.verifyUser, userController.addInvoice);
router.patch(
	'/invoice/edit/:id',
	authenticate.verifyUser,
	userController.editInvoice
);
router.delete(
	'/invoice/delete/:id',
	authenticate.verifyUser,
	userController.deleteInvoice
);

// TODO: expense
router.get(
	'/expense/single/:id',
	authenticate.verifyUser,
	userController.getSingleExpense
);
router.get(
	'/expense/all',
	authenticate.verifyUser,
	userController.getAllExpenses
);
router.post('/expense/add', authenticate.verifyUser, userController.addExpense);
router.patch(
	'/expense/edit/:id',
	authenticate.verifyUser,
	userController.editExpense
);
router.delete(
	'/expense/delete/:id',
	authenticate.verifyUser,
	userController.deleteExpense
);

//TODO: graphs
router.get('/cash/graph', authenticate.verifyUser, userController.getTotalCash);
router.get(
	'/revenue/graph',
	authenticate.verifyUser,
	userController.getCashGraph
);
router.get(
	'/expense/graph',
	authenticate.verifyUser,
	userController.getExpenseGraph
);
router.get(
	'/invoice/graph',
	authenticate.verifyUser,
	userController.getInvoiceGraph
);
router.get(
	'/energy/graph',
	authenticate.verifyUser,
	userController.getEnergyGraph
);

module.exports = router;
