module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contacts', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    });
    await queryInterface.addColumn('contacts', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contacts', 'createdAt');
    await queryInterface.removeColumn('contacts', 'updatedAt');
  }
};
