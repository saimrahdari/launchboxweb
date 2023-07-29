var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/authAdmin');
var adminController = require('../controllers/adminController');

// ? Admin Routes //
router.post('/register', adminController.register);
router.post(
	'/login',
	passport.authenticate('local-admin'),
	adminController.signIn
);

// TODO: expense
router.get(
	'/expense/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleExpense
);
router.get(
	'/expense/all',
	authenticate.verifyAdmin,
	adminController.getAllExpenses
);
router.post(
	'/expense/add',
	authenticate.verifyAdmin,
	adminController.addExpense
);
router.patch(
	'/expense/edit/:id',
	authenticate.verifyAdmin,
	adminController.editExpense
);
router.delete(
	'/expense/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteExpense
);

// TODO: members
router.get(
	'/member/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleMember
);
router.get(
	'/member/all',
	authenticate.verifyAdmin,
	adminController.getAllMembers
);
router.post('/member/add', authenticate.verifyAdmin, adminController.addMember);
router.patch(
	'/member/edit/:id',
	authenticate.verifyAdmin,
	adminController.editMember
);
router.delete(
	'/member/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteMember
);

//TODO: vendor
router.get(
	'/vendor/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleVendor
);
router.get(
	'/vendor/all',
	authenticate.verifyAdmin,
	adminController.getAllVendors
);
router.post('/vendor/add', authenticate.verifyAdmin, adminController.addVendor);
router.patch(
	'/vendor/edit/:id',
	authenticate.verifyAdmin,
	adminController.editVendor
);
router.delete(
	'/vendor/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteVendor
);

// TODO: package
router.get(
	'/package/single/:id',
	authenticate.verifyAdmin,
	adminController.getSinglePackage
);
router.get(
	'/package/all',
	authenticate.verifyAdmin,
	adminController.getAllPackages
);
router.post(
	'/package/add',
	authenticate.verifyAdmin,
	adminController.addPackage
);
router.patch(
	'/package/edit/:id',
	authenticate.verifyAdmin,
	adminController.editPackage
);
router.delete(
	'/package/delete/:id',
	authenticate.verifyAdmin,
	adminController.deletePackage
);

// TODO: category
router.get(
	'/category/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleCategory
);
router.get(
	'/category/all',
	authenticate.verifyAdmin,
	adminController.getAllCategories
);
router.post(
	'/category/add',
	authenticate.verifyAdmin,
	adminController.addCategory
);
router.patch(
	'/category/edit/:id',
	authenticate.verifyAdmin,
	adminController.editCategory
);
router.delete(
	'/category/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteCategory
);

// TODO: pettycash
router.get(
	'/cash/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleCash
);
router.get(
	'/cash/all',
	authenticate.verifyAdmin,
	adminController.getAllPettyCash
);
router.post('/cash/add', authenticate.verifyAdmin, adminController.addCash);
router.patch(
	'/cash/edit/:id',
	authenticate.verifyAdmin,
	adminController.editPettyCash
);
router.delete(
	'/cash/delete/:id',
	authenticate.verifyAdmin,
	adminController.deletePettyCash
);

// TODO: energy
router.get(
	'/energy/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleEnergy
);
router.get(
	'/energy/all',
	authenticate.verifyAdmin,
	adminController.getAllEnergy
);
router.post('/energy/add', authenticate.verifyAdmin, adminController.addEnergy);
router.patch(
	'/energy/edit/:id',
	authenticate.verifyAdmin,
	adminController.editEnergy
);
router.delete(
	'/energy/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteEnergy
);

// TODO: invoice
router.get(
	'/invoice/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleInvoice
);
router.get(
	'/invoice/all',
	authenticate.verifyAdmin,
	adminController.getAllInvoices
);
router.post(
	'/invoice/add',
	authenticate.verifyAdmin,
	adminController.addInvoice
);
router.patch(
	'/invoice/edit/:id',
	authenticate.verifyAdmin,
	adminController.editInvoice
);
router.delete(
	'/invoice/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteInvoice
);

//TODO: teams
router.get(
	'/team/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleTeam
);
router.get('/team/all', authenticate.verifyAdmin, adminController.getAllTeams);
router.post('/team/add', authenticate.verifyAdmin, adminController.addTeam);
router.patch(
	'/team/edit/:id',
	authenticate.verifyAdmin,
	adminController.editTeam
);
router.delete(
	'/team/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteTeam
);

//TODO: graphs
router.get(
	'/cash/graph',
	authenticate.verifyAdmin,
	adminController.getTotalCash
);
router.get(
	'/expense/graph',
	authenticate.verifyAdmin,
	adminController.getExpenseGraph
);
router.get(
	'/revenue/graph',
	authenticate.verifyAdmin,
	adminController.getCashGraph
);
router.get(
	'/invoice/graph',
	authenticate.verifyAdmin,
	adminController.getInvoiceGraph
);
router.get(
	'/energy/graph',
	authenticate.verifyAdmin,
	adminController.getEnergyGraph
);

// TODO: helpers
router.get(
	'/helper/packages/:id',
	authenticate.verifyAdmin,
	adminController.findPackages
);
router.get(
	'/helper/vendors/:id',
	authenticate.verifyAdmin,
	adminController.findVendors
);
router.get(
	'/helper/teams/:id',
	authenticate.verifyAdmin,
	adminController.findTeams
);
router.get(
	'/helper/categories/:id',
	authenticate.verifyAdmin,
	adminController.findCategories
);

//TODO: user
router.get(
	'/user/single/:id',
	authenticate.verifyAdmin,
	adminController.getSingleUser
);
router.get('/user/all', authenticate.verifyAdmin, adminController.getAllUsers);
router.post('/user/add', authenticate.verifyAdmin, adminController.addUser);
router.patch(
	'/user/edit/:id',
	authenticate.verifyAdmin,
	adminController.editUser
);
router.delete(
	'/user/delete/:id',
	authenticate.verifyAdmin,
	adminController.deleteUser
);

module.exports = router;
