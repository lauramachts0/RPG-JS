// Definindo uma classe para representar um usuário
class User {
    constructor(id, username) {
      this.id = id;
      this.username = username;
    }
  
    // Método para buscar informações do usuário de forma assíncrona
    async fetchUserInfo() {
      return new Promise((resolve, reject) => {
        // Simulando uma requisição assíncrona, por exemplo, a uma API
        setTimeout(() => {
          const userInfo = {
            id: this.id,
            username: this.username,
            email: `${this.username}@example.com`,
            joinedAt: new Date()
          };
          resolve(userInfo);
        }, 1000); // Tempo simulado de resposta: 1 segundo
      });
    }
  }
  
  // Função para buscar informações de vários usuários
  async function fetchUsersInfo(userIds) {
    const usersInfo = [];
  
    // Iterando pelos IDs dos usuários
    for (const userId of userIds) {
      // Criando instância de usuário com ID e nome de usuário
      const user = new User(userId, `user${userId}`);
      
      try {
        // Buscando informações do usuário e aguardando pela resposta assíncrona
        const userInfo = await user.fetchUserInfo();
        usersInfo.push(userInfo);
      } catch (error) {
        console.error(`Erro ao buscar informações do usuário ${userId}:`, error);
      }
    }
  
    return usersInfo;
  }
  
  // IDs dos usuários a serem buscados
  const userIds = [1, 2, 3];
  
  // Chamada da função para buscar informações dos usuários
  fetchUsersInfo(userIds)
    .then(usersInfo => {
      console.log("Informações dos usuários:", usersInfo);
    })
    .catch(error => {
      console.error("Erro ao buscar informações dos usuários:", error);
    });
  // Definição da classe Character (personagem)
class Character {
    constructor(name, health, strength) {
      this.name = name;
      this.health = health;
      this.strength = strength;
    }
  
    // Método para atacar outro personagem
    attack(target) {
      console.log(`${this.name} ataca ${target.name}!`);
      const damage = Math.floor(Math.random() * this.strength) + 1;
      target.takeDamage(damage);
    }
  
    // Método para receber dano
    takeDamage(damage) {
      console.log(`${this.name} sofre ${damage} de dano!`);
      this.health -= damage;
      if (this.health <= 0) {
        console.log(`${this.name} foi derrotado!`);
      }
    }
  }
  
  // Definição da classe Player (jogador), que herda de Character
  class Player extends Character {
    constructor(name, health, strength) {
      super(name, health, strength);
      this.inventory = [];
    }
  
    // Método para adicionar um item ao inventário do jogador
    addItem(item) {
      this.inventory.push(item);
      console.log(`${this.name} obteve o item ${item}!`);
    }
  
    // Método para listar os itens do inventário
    listItems() {
      console.log(`${this.name} possui os seguintes itens:`);
      this.inventory.forEach(item => {
        console.log(item);
      });
    }
  }
  
  // Definição da classe Enemy (inimigo), que herda de Character
  class Enemy extends Character {
    constructor(name, health, strength, loot) {
      super(name, health, strength);
      this.loot = loot;
    }
  
    // Método para derrotar o inimigo e obter seu saque
    defeat() {
      console.log(`${this.name} foi derrotado!`);
      return this.loot;
    }
  }
  
  // Função para simular uma batalha entre o jogador e um inimigo
  function battle(player, enemy) {
    console.log(`Uma batalha começou! ${player.name} vs ${enemy.name}`);
  
    while (player.health > 0 && enemy.health > 0) {
      // Player ataca primeiro
      player.attack(enemy);
      if (enemy.health <= 0) {
        // Inimigo derrotado
        const loot = enemy.defeat();
        player.addItem(loot);
        break;
      }
  
      // Inimigo contra-ataca
      enemy.attack(player);
      if (player.health <= 0) {
        // Jogador derrotado
        console.log(`${player.name} foi derrotado!`);
        break;
      }
    }
  }
  
  // Criando instâncias de jogador e inimigo
  const player1 = new Player("Hero", 100, 20);
  const enemy1 = new Enemy("Goblin", 50, 10, "Potion");
  
  // Iniciando a batalha
  battle(player1, enemy1);
  
  // Exibindo itens do jogador
  player1.listItems();
  