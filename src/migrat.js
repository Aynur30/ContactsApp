exports.up = function (knex) {
    return knex.schema.table('contacts', function (table) {
      table.string('phone_number');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('contacts', function (table) {
      table.dropColumn('phone_number');
    });
  };
  