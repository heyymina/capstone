const {
    client,
    createUser,
    getAllUsers,
    createTea,
    getAllTeas,
    createReview,
    getReviewsByTeaId,
    updateUser,
    updateTea
  } = require('./index');
  
  async function dropTables() {
    try {
      console.log("Dropping tables...");
  
      await client.query(`
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS teas;
        DROP TABLE IF EXISTS users;
      `);
  
      console.log("Tables dropped.");
    } catch (error) {
      console.error("Error dropping tables:", error);
      throw error;
    }
  }
  
  async function createTables() {
    try {
      console.log("Creating tables...");
  
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
  
        CREATE TABLE teas (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2),
          image_url TEXT,
          category VARCHAR(100)
        );
  
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          tea_id INTEGER REFERENCES teas(id),
          user_id INTEGER REFERENCES users(id),
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT
        );
      `);
  
      console.log("Tables created.");
    } catch (error) {
      console.error("Error creating tables:", error);
      throw error;
    }
  }
  
  async function createInitialUsers() {
    try {
      console.log("Creating initial users...");
  
      await createUser({ username: "tea_lover", password: "green123" });
      await createUser({ username: "matcha_monster", password: "smoothAF" });
      await createUser({ username: "oolong_obsessed", password: "leaflife" });
  
      console.log("Users created.");
    } catch (error) {
      console.error("Error creating users:", error);
      throw error;
    }
  }
  
  async function createInitialTeas() {
    try {
      console.log("Creating initial teas...");
  
      await createTea({
        name: "Jasmine Green Tea",
        description: "A floral and fragrant green tea infused with jasmine blossoms.",
        price: 8.99,
        image_url: "/images/jasmine-green.jpg",
        category: "Green"
      });
  
      await createTea({
        name: "Earl Grey",
        description: "A bold black tea with hints of bergamot citrus.",
        price: 7.5,
        image_url: "/images/earl-grey.jpg",
        category: "Black"
      });
  
      await createTea({
        name: "Chamomile Herbal",
        description: "Naturally caffeine-free, perfect for winding down.",
        price: 6.25,
        image_url: "/images/chamomile.jpg",
        category: "Herbal"
      });
  
      console.log("Teas created.");
    } catch (error) {
      console.error("Error creating teas:", error);
      throw error;
    }
  }
  
  async function createInitialReviews() {
    try {
      console.log("Creating initial reviews...");
  
      const users = await getAllUsers();
      const teas = await getAllTeas();
  
      await createReview({
        tea_id: teas[0].id,
        user_id: users[0].id,
        rating: 5,
        comment: "So calming! Perfect for afternoons."
      });
  
      await createReview({
        tea_id: teas[1].id,
        user_id: users[1].id,
        rating: 4,
        comment: "Strong flavor, great with milk."
      });
  
      await createReview({
        tea_id: teas[2].id,
        user_id: users[2].id,
        rating: 3,
        comment: "Nice before bed, but a bit bland for my taste."
      });
  
      console.log("Reviews created.");
    } catch (error) {
      console.error("Error creating reviews:", error);
      throw error;
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialTeas();
      await createInitialReviews();
    } catch (error) {
      console.error("Error rebuilding DB:", error);
      throw error;
    }
  }
  
  async function testDB() {
    try {
      console.log("Testing database...");
  
      const users = await getAllUsers();
      console.log("All Users:", users);
  
      const teas = await getAllTeas();
      console.log("All Teas:", teas);
  
      const reviews = await getReviewsByTeaId(teas[0].id);
      console.log(`Reviews for ${teas[0].name}:`, reviews);
  
    } catch (error) {
      console.error("Error testing DB:", error);
      throw error;
    }
  }
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
  