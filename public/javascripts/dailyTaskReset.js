// const cron = require('node-cron');
// const Task = require('../../models/toDo').Task;

// // cron.schedule('0 0 * * *', async () => {
//     async function runCronJob() {
//         try {
//             console.log('Cron job started at:', new Date().toISOString());
    
//             // Find all completed tasks and update their status to 'In Progress'
//             const result1 = await Task.updateMany({ status: 'Completed' }, { $set: { status: 'In Progress' } });
//             console.log('Updated', result1.nModified, 'tasks from Completed to In Progress');
    
//             // Reset XP for all tasks
//             const result2 = await Task.updateMany({}, { $set: { xp: 50 } });
//             console.log('Reset XP for', result2.nModified, 'tasks');
    
//             console.log('Cron job completed at:', new Date().toISOString());
//         } catch (err) {
//             console.error('Error resetting tasks:', err);
//         }
//     }
    
//     // Run the code directly for testing
//     runCronJob();
