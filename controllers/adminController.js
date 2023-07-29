var passport = require('passport');

var authenticate = require('../middleware/authAdmin');
var asyncHandler = require('../middleware/asyncHandler');
var ErrorHandler = require('../utils/error');

var User = require('../models/users');
var Category = require('../models/category');
var PettyCash = require('../models/pettyCash');
var Energy = require('../models/energy');
var Package = require('../models/packages');
var Vendor = require('../models/vendor');
var Member = require('../models/members');
var Team = require('../models/teams');
var Invoice = require('../models/invoice');
var Expense = require('../models/expenses');
var Admin = require('../models/admin');

exports.register = async (req, res, next) => {
	try {
		const user = await Admin.register(
			new User({
				email: req.body.email,
			}),
			req.body.password
		);
		if (user) {
			try {
				await user.save();
				passport.authenticate('local-admin')(req, res, () => {
					res.status(201).json({
						success: true,
						status: 'Registration Successful!',
					});
				});
			} catch (error) {
				return next(error);
			}
		}
	} catch (error) {
		return next(error);
	}
};

exports.signIn = asyncHandler(async (req, res) => {
	let token = authenticate.getToken({ _id: req.user._id });
	res.status(200).json({
		success: true,
		token: token,
		user: req.user._id,
	});
});

exports.addExpense = asyncHandler(async (req, res) => {
	await Expense.create(req.body);
	res.status(201).json({ success: true, message: 'Expense Added' });
});

exports.getSingleExpense = asyncHandler(async (req, res) => {
	const expense = await Expense.findById(req.params.id).populate(
		'vendor category'
	);
	res.status(200).json({ expense });
});

exports.getAllExpenses = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Expense.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const expenses = await Expense.find({})
		.populate('vendor category user')
		.skip((page - 1) * perPage)
		.limit(perPage);

	res.status(200).json({
		expenses,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editExpense = asyncHandler(async (req, res) => {
	await Expense.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteExpense = asyncHandler(async (req, res) => {
	await Expense.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addMember = asyncHandler(async (req, res) => {
	await Member.create(req.body);
	res.status(201).json({ success: true, message: 'Member Added' });
});

exports.getSingleMember = asyncHandler(async (req, res) => {
	const member = await Member.findById(req.params.id).populate(
		'team package user'
	);
	res.status(200).json({ member });
});

exports.getAllMembers = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Member.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const members = await Member.find()
		.populate('team package user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		members,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editMember = asyncHandler(async (req, res) => {
	await Member.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteMember = asyncHandler(async (req, res) => {
	await Member.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addVendor = asyncHandler(async (req, res) => {
	await Vendor.create(req.body);
	res.status(201).json({ success: true, message: 'Vendor Added' });
});

exports.getSingleVendor = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params.id).populate('user');
	res.status(200).json({ vendor });
});

exports.getAllVendors = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Vendor.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const vendors = await Vendor.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		vendors,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editVendor = asyncHandler(async (req, res) => {
	await Vendor.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteVendor = asyncHandler(async (req, res) => {
	await Vendor.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addPackage = asyncHandler(async (req, res) => {
	await Package.create(req.body);
	res.status(201).json({ success: true, message: 'Package Added' });
});

exports.getSinglePackage = asyncHandler(async (req, res) => {
	const package = await Package.findById(req.params.id).populate('user');
	res.status(200).json({ package });
});

exports.getAllPackages = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Package.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const packages = await Package.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		packages,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editPackage = asyncHandler(async (req, res) => {
	await Package.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deletePackage = asyncHandler(async (req, res) => {
	await Package.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addCategory = asyncHandler(async (req, res) => {
	await Category.create(req.body);
	res.status(201).json({ success: true, message: 'Category Added' });
});

exports.getSingleCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	res.status(200).json({ category });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Category.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const categories = await Category.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		categories,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editCategory = asyncHandler(async (req, res) => {
	await Category.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
	await Category.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addCash = asyncHandler(async (req, res) => {
	await PettyCash.create(req.body);
	res.status(201).json({ success: true, message: 'Petty Cash Added' });
});

exports.getSingleCash = asyncHandler(async (req, res) => {
	const pettyCash = await PettyCash.findById(req.params.id).populate('user');
	res.status(200).json({
		pettyCash,
	});
});

exports.getAllPettyCash = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await PettyCash.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const pettycash = await PettyCash.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		pettycash,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editPettyCash = asyncHandler(async (req, res) => {
	await PettyCash.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deletePettyCash = asyncHandler(async (req, res) => {
	await PettyCash.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addEnergy = asyncHandler(async (req, res) => {
	await Energy.create(req.body);
	res.status(201).json({ success: true, message: 'Energy Added' });
});

exports.getSingleEnergy = asyncHandler(async (req, res) => {
	const energy = await Energy.findById(req.params.id);
	res.status(200).json({ energy });
});

exports.getAllEnergy = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Energy.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const energies = await Energy.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		energies,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editEnergy = asyncHandler(async (req, res) => {
	await Energy.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteEnergy = asyncHandler(async (req, res) => {
	await Energy.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addInvoice = asyncHandler(async (req, res) => {
	await Invoice.create(req.body);
	res.status(201).json({ success: true, message: 'Invoice Added' });
});

exports.getSingleInvoice = asyncHandler(async (req, res) => {
	const invoice = await Invoice.findById(req.params.id).populate('team user');
	res.status(200).json({ invoice });
});

exports.getAllInvoices = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Invoice.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const invoices = await Invoice.find({})
		.populate('team user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		invoices,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editInvoice = asyncHandler(async (req, res) => {
	await Invoice.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteInvoice = asyncHandler(async (req, res) => {
	await Invoice.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addTeam = asyncHandler(async (req, res) => {
	await Team.create(req.body);
	res.status(201).json({ success: true, message: 'Team Added' });
});

exports.getSingleTeam = asyncHandler(async (req, res) => {
	const team = await Team.findById(req.params.id).populate('user');
	res.status(200).json({ team });
});

exports.getAllTeams = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await Team.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const teams = await Team.find({})
		.populate('user')
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		teams,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editTeam = asyncHandler(async (req, res) => {
	await Team.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteTeam = asyncHandler(async (req, res) => {
	await Team.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.findTeams = asyncHandler(async (req, res) => {
	const teams = await Team.find({ user: req.params.id });
	res.status(202).json({ teams });
});

exports.findVendors = asyncHandler(async (req, res) => {
	const vendors = await Vendor.find({ user: req.params.id });
	res.status(202).json({ vendors });
});

exports.findPackages = asyncHandler(async (req, res) => {
	const packages = await Package.find({ user: req.params.id });
	res.status(202).json({ packages });
});

exports.findCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ user: req.params.id });
	res.status(202).json({ categories });
});

exports.addUser = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.register(
			new User({
				email: req.body.email,
			}),
			req.body.password
		);
		if (user) {
			try {
				await user.save();
				passport.authenticate('local')(req, res, () => {
					res.status(201).json({
						success: true,
						status: 'User Added',
					});
				});
			} catch (error) {
				return next(error);
			}
		}
	} catch (error) {
		return next(error);
	}
});

exports.getSingleUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ user });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = 10;
	const totalItems = await User.countDocuments();
	const totalPages = Math.ceil(totalItems / perPage);
	const users = await User.find({})
		.skip((page - 1) * perPage)
		.limit(perPage);
	res.status(200).json({
		users,
		totalItems: totalItems,
		currentPage: page,
		perPage: perPage,
		totalPages: totalPages,
	});
});

exports.editUser = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user && user.id !== req.params.id) {
		return res.status(409).json({
			message: 'Email already associated with a user.',
		});
	}
	await User.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteUser = asyncHandler(async (req, res) => {
	Member.deleteMany({ user: req.params.id });
	Energy.deleteMany({ user: req.params.id });
	Package.deleteMany({ user: req.params.id });
	PettyCash.deleteMany({ user: req.params.id });
	Team.deleteMany({ user: req.params.id });
	Expense.deleteMany({ user: req.params.id });
	Vendor.deleteMany({ user: req.params.id });
	Invoice.deleteMany({ user: req.params.id });
	Category.deleteMany({ user: req.params.id });
	await User.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'User Deleted' });
});

exports.getTotalCash = asyncHandler(async (req, res) => {
	var deduct = 0;
	var add = 0;
	const petty = await PettyCash.aggregate([
		{
			$group: {
				_id: 'none',
				total: { $sum: '$amount' },
			},
		},
		{
			$project: {
				_id: 0,
				total: 1,
			},
		},
	]);
	const expense = await Expense.aggregate([
		{
			$match: {
				user: req.user._id,
			},
		},
		{
			$group: {
				_id: 'none',
				total: { $sum: '$amount' },
			},
		},
		{
			$project: {
				_id: 0,
				total: 1,
			},
		},
	]);
	if (expense.length > 0) {
		deduct = expense[0].total;
	}
	if (petty.length > 0) {
		add = petty[0].total;
	}
	data = add - deduct;
	res.status(200).json({ data });
});

exports.getExpenseGraph = asyncHandler(async (req, res) => {
	const data = await Expense.aggregate([
		{
			$lookup: {
				from: 'categories',
				localField: 'category',
				foreignField: '_id',
				as: 'categoryDetails',
			},
		},
		{
			$unwind: '$categoryDetails',
		},
		{
			$group: {
				_id: '$categoryDetails.name',
				totalAmountSpent: { $sum: '$amount' },
			},
		},
		{
			$project: {
				_id: 0,
				categoryName: '$_id',
				totalAmountSpent: 1,
			},
		},
	]);
	const expenseTotal = await Expense.aggregate([
		{
			$group: {
				_id: 'none',
				totalExpense: { $sum: '$amount' },
			},
		},
		{
			$project: {
				_id: 0,
				totalExpense: 1,
			},
		},
	]);
	res.status(200).json({ data, expenseTotal: expenseTotal[0].totalExpense });
});

exports.getCashGraph = asyncHandler(async (req, res) => {
	const dataPaid = await Invoice.aggregate([
		{
			$match: {
				paid: true,
			},
		},
		{
			$group: {
				_id: 'none',
				totalRevenue: { $sum: '$total' },
			},
		},
		{
			$project: {
				_id: 0,
				totalRevenue: 1,
			},
		},
	]);
	const dataUnpaid = await Invoice.aggregate([
		{
			$match: {
				paid: false,
			},
		},
		{
			$group: {
				_id: 'none',
				totalRevenue: { $sum: '$total' },
			},
		},
		{
			$project: {
				_id: 0,
				totalRevenue: 1,
			},
		},
	]);
	var paid = dataPaid.length ? dataPaid[0].totalRevenue : 0;
	var unpaid = dataUnpaid.length > 0 ? dataUnpaid[0].totalRevenue : 0;
	const total = paid + unpaid;
	var paidPer = (paid / total) * 100;
	var unpaidPer = (unpaid / total) * 100;
	res.status(200).json({
		paid,
		paidPer,
		unpaid,
		unpaidPer,
	});
});

exports.getInvoiceGraph = asyncHandler(async (req, res) => {
	const data = await Invoice.aggregate([
		{
			$group: {
				_id: {
					month: { $month: '$date' },
					year: { $year: '$date' },
				},
				totalAmount: { $sum: '$total' },
			},
		},
		{
			$project: {
				_id: 0,
				month: '$_id.month',
				year: '$_id.year',
				totalAmount: 1,
			},
		},
		{
			$sort: { year: 1, month: 1 },
		},
	]);
	res.status(200).json(data);
});

exports.getEnergyGraph = asyncHandler(async (req, res) => {
	const year = new Date().getFullYear();
	const month = new Date().getMonth();
	const targetMonth = req.query.month ? JSON.parse(req.query.month) : month;
	const data = await Energy.aggregate([
		{
			$match: {
				date: {
					$gte: new Date(year, targetMonth, 1),
					$lt: new Date(year, targetMonth + 1, 1),
				},
			},
		},
		{
			$sort: { date: 1 },
		},
		{
			$group: {
				_id: {
					year: { $year: '$date' },
					month: { $month: '$date' },
					day: { $dayOfMonth: '$date' },
				},
				firstReading: { $first: '$reading' },
			},
		},
		{
			$sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
		},
	]);
	var finalData = [];
	for (let index = 0; index < data.length - 1; index++) {
		if (data[index]._id.day + 1 === data[index + 1]._id.day) {
			var obj = {
				day: data[index]._id.day,
				reading:
					data[index + 1].firstReading - data[index].firstReading,
			};
			finalData.push(obj);
		}
	}
	res.status(200).json({ data: finalData });
});
