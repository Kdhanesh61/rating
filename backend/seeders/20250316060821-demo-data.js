'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Admin User',
        email: 'admin@example.com',
        address: '123 Main Street, City, Country',
        password: 'Admin@123', // Note: Hash passwords in real apps
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440000',
        name: 'Store Owner',
        email: 'owner@example.com',
        address: '456 Business Rd, City, Country',
        password: 'Owner@123',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
