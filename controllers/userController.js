var passport = require('passport');

var authenticate = require('../middleware/auth');
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

exports.register = async (req, res, next) => {
	var exists = await User.findOne({
		email: req.body.email,
	});
	if (exists) {
		next(
			new ErrorHandler('Email  already associated with an account', 409)
		);
	} else {
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

exports.addCategory = asyncHandler(async (req, res) => {
	await Category.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Category Added' });
});

exports.getSingleCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	res.status(200).json({ category });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ user: req.user._id });
	res.status(200).json({ categories });
});

exports.editCategory = asyncHandler(async (req, res) => {
	await Category.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
	await Category.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addCash = asyncHandler(async (req, res) => {
	await PettyCash.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Petty Cash Added' });
});

exports.getSingleCash = asyncHandler(async (req, res) => {
	const pettyCash = await PettyCash.findById(req.params.id);
	res.status(200).json({ pettyCash });
});

exports.getAllPettyCash = asyncHandler(async (req, res) => {
	const pettycash = await PettyCash.find({ user: req.user._id });
	res.status(200).json({ pettycash });
});

exports.editPettyCash = asyncHandler(async (req, res) => {
	await PettyCash.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deletePettyCash = asyncHandler(async (req, res) => {
	await PettyCash.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addEnergy = asyncHandler(async (req, res) => {
	await Energy.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Energy Added' });
});

exports.getSingleEnergy = asyncHandler(async (req, res) => {
	const energy = await Energy.findById(req.params.id);
	res.status(200).json({ energy });
});

exports.getAllEnergy = asyncHandler(async (req, res) => {
	const energies = await Energy.find({ user: req.user._id });
	res.status(200).json({ energies });
});

exports.editEnergy = asyncHandler(async (req, res) => {
	await Energy.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteEnergy = asyncHandler(async (req, res) => {
	await Energy.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addPackage = asyncHandler(async (req, res) => {
	await Package.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Package Added' });
});

exports.getSinglePackage = asyncHandler(async (req, res) => {
	const package = await Package.findById(req.params.id);
	res.status(200).json({ package });
});

exports.getAllPackages = asyncHandler(async (req, res) => {
	const packages = await Package.find({ user: req.user._id });
	res.status(200).json({ packages });
});

exports.editPackage = asyncHandler(async (req, res) => {
	await Package.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deletePackage = asyncHandler(async (req, res) => {
	await Package.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addVendor = asyncHandler(async (req, res) => {
	await Vendor.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Vendor Added' });
});

exports.getSingleVendor = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params.id);
	res.status(200).json({ vendor });
});

exports.getAllVendors = asyncHandler(async (req, res) => {
	const vendors = await Vendor.find({ user: req.user._id });
	res.status(200).json({ vendors });
});

exports.editVendor = asyncHandler(async (req, res) => {
	await Vendor.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteVendor = asyncHandler(async (req, res) => {
	await Vendor.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addMember = asyncHandler(async (req, res) => {
	await Member.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Member Added' });
});

exports.getSingleMember = asyncHandler(async (req, res) => {
	const member = await Member.findById(req.params.id).populate(
		'team package'
	);
	res.status(200).json({ member });
});

exports.getAllMembers = asyncHandler(async (req, res) => {
	const members = await Member.find({ user: req.user._id }).populate(
		'team package'
	);

	res.status(200).json({ members });
});

exports.getMembersByTeam = asyncHandler(async (req, res) => {
	const members = await Member.find({
		user: req.user._id,
		team: req.params.id,
	}).populate('package');
	var total = 0;
	for (let index = 0; index < members.length; index++) {
		total += members[index].package.price;
	}
	res.status(200).json({ member: members.length, rate: total });
});

exports.editMember = asyncHandler(async (req, res) => {
	await Member.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteMember = asyncHandler(async (req, res) => {
	await Member.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addTeam = asyncHandler(async (req, res) => {
	await Team.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Team Added' });
});

exports.getSingleTeam = asyncHandler(async (req, res) => {
	const team = await Team.findById(req.params.id);
	res.status(200).json({ team });
});

exports.getAllTeams = asyncHandler(async (req, res) => {
	const teams = await Team.find({ user: req.user._id });
	res.status(200).json({ teams });
});

exports.editTeam = asyncHandler(async (req, res) => {
	await Team.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteTeam = asyncHandler(async (req, res) => {
	await Team.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addInvoice = asyncHandler(async (req, res) => {
	await Invoice.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Invoice Added' });
});

exports.getSingleInvoice = asyncHandler(async (req, res) => {
	const invoice = await Invoice.findById(req.params.id).populate('team');
	res.status(200).json({ invoice });
});

exports.getAllInvoices = asyncHandler(async (req, res) => {
	const invoices = await Invoice.find({ user: req.user._id }).populate(
		'team'
	);
	res.status(200).json({ invoices });
});

exports.editInvoice = asyncHandler(async (req, res) => {
	await Invoice.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteInvoice = asyncHandler(async (req, res) => {
	await Invoice.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.addExpense = asyncHandler(async (req, res) => {
	await Expense.create({ ...req.body, user: req.user._id });
	res.status(201).json({ success: true, message: 'Expense Added' });
});

exports.getSingleExpense = asyncHandler(async (req, res) => {
	const expense = await Expense.findById(req.params.id).populate(
		'vendor category'
	);
	res.status(200).json({ expense });
});

exports.getAllExpenses = asyncHandler(async (req, res) => {
	const expenses = await Expense.find({ user: req.user._id }).populate(
		'vendor category'
	);

	res.status(200).json({ expenses });
});

exports.editExpense = asyncHandler(async (req, res) => {
	await Expense.findByIdAndUpdate(req.params.id, {
		...req.body,
		user: req.user._id,
	});
	res.status(200).json({ message: 'Successfully Edited' });
});

exports.deleteExpense = asyncHandler(async (req, res) => {
	await Expense.findByIdAndDelete(req.params.id);
	res.status(202).json({ message: 'Successfully Deleted' });
});

exports.getExpenseGraph = asyncHandler(async (req, res) => {
	const data = await Expense.aggregate([
		{
			$match: {
				user: req.user._id,
			},
		},
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
			$match: {
				user: req.user._id,
			},
		},

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
				user: req.user._id,
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
				user: req.user._id,
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
	res.status(200).json({
		totalRevenue: dataPaid.length ? dataPaid[0].totalRevenue : 0,
		unpaid: dataUnpaid.length > 0 ? dataUnpaid[0].totalRevenue : 0,
	});
});

exports.getTotalCash = asyncHandler(async (req, res) => {
	var deduct = 0;
	var add = 0;
	const petty = await PettyCash.aggregate([
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

exports.getInvoiceGraph = asyncHandler(async (req, res) => {
	const data = await Invoice.aggregate([
		{
			$match: {
				user: req.user._id,
			},
		},
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
		// {
		// 	$match: {
		// 		date: {
		// 			$gte: new Date(year, targetMonth, 1),
		// 			$lt: new Date(year, targetMonth + 1, 1),
		// 		},
		// 	},
		// },
		// {
		// 	$sort: { date: 1 }, // Sort the documents by date in ascending order
		// },
		// {
		// 	$group: {
		// 		_id: {
		// 			year: { $year: '$date' },
		// 			month: { $month: '$date' },
		// 			day: { $dayOfMonth: '$date' },
		// 		},
		// 		readings: { $push: '$reading' }, // Store all readings of the day in an array
		// 	},
		// },
		// {
		// 	$sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }, // Sort by date in ascending order
		// },
		// {
		// 	$project: {
		// 		_id: 0,
		// 		date: {
		// 			$dateFromParts: {
		// 				year: '$_id.year',
		// 				month: '$_id.month',
		// 				day: '$_id.day',
		// 			},
		// 		},
		// 		readings: 1,
		// 	},
		// },
		// {
		// 	$lookup: {
		// 		from: 'energy', // Replace 'energy' with the actual collection name of Energy
		// 		let: { nextDay: { $add: ['$date', 86400000] } }, // Add 1 day (in milliseconds) to the current date to find the next day
		// 		pipeline: [
		// 			{
		// 				$match: {
		// 					date: { $eq: { $toDate: '$$nextDay' } }, // Match documents with date equal to the next day
		// 				},
		// 			},
		// 			{ $limit: 1 }, // Limit to the first document found (next day's reading)
		// 			{ $project: { _id: 0, reading: 1 } }, // Only include the reading field
		// 		],
		// 		as: 'nextDayReading', // Store the result in the 'nextDayReading' field
		// 	},
		// },
		// {
		// 	$project: {
		// 		date: 1,
		// 		difference: {
		// 			$cond: [
		// 				{ $ne: ['$readings', []] }, // Check if the array is not empty
		// 				{
		// 					$subtract: [
		// 						{ $arrayElemAt: ['$readings', 0] },
		// 						{
		// 							$arrayElemAt: [
		// 								'$nextDayReading.reading',
		// 								0,
		// 							],
		// 						}, // Reading of the first document of the next day
		// 					],
		// 				},
		// 				null,
		// 			],
		// 		},
		// 	},
		// },
		// {
		// 	$sort: { date: 1 }, // Sort the results by date in ascending order
		// },
		{
			$match: {
				date: {
					$gte: new Date(year, targetMonth, 1),
					$lt: new Date(year, targetMonth + 1, 1),
				},
			},
		},
		{
			$sort: { date: 1 }, // Sort the documents by date in ascending order
		},
		{
			$group: {
				_id: {
					year: { $year: '$date' },
					month: { $month: '$date' },
					day: { $dayOfMonth: '$date' },
				},
				firstReading: { $first: '$reading' }, // Reading of the first document of the day
			},
		},
		{
			$sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }, // Sort by date in ascending order
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
