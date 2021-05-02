exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('email', 128).unique().notNullable();
      tbl.string('password').notNullable();

      tbl.timestamps(true, true);
    })
    .createTable('favoriteChannels', (tbl) => {
      tbl.increments();
      //   foreign key to users table
      tbl
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('channelId').notNullable();
    })
    .createTable('favoritePrograms', (tbl) => {
      tbl.increments();
      //   foreign key to users table
      tbl
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('programId').notNullable();
    })
    .createTable('favoriteEpisodes', (tbl) => {
      tbl.increments();
      //   foreign key to users table
      tbl
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('episodeId').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('favoriteChannels')
    .dropTableIfExists('favoritePrograms')
    .dropTableIfExists('favoriteEpisodes');
};
