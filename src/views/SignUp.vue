<template>
  <DefaultLayout>
    <div class="registration-form">
      <h2>Registro de Usuário</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Nome de Usuário</label>
          <input type="text" id="username" :class="{ 'input-error': usernameExists, 'input-success': usernameAccepted }"
            v-model="user.username" @blur="checkUsername" @input="resetUsernameChecks" placeholder="Nome de Usuário"
            required>
          <p v-if="usernameExists" class="error-text">Usuário existente</p>
          <p v-if="usernameAccepted" class="success-text">Username aceito!</p>
        </div>
        <div class="default-separator"></div>

        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" :class="{ 'input-error': emailExists, 'input-success': emailAccepted }"
            v-model="user.email" @blur="checkEmail" @input="resetEmailChecks" placeholder="E-mail" required>
          <p v-if="emailExists" class="error-text">Email existente!</p>
          <p v-if="emailAccepted" class="success-text">Email aceito!</p>
        </div>
        <div class="default-separator"></div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" @input="passwordsMatch = doPasswordsMatch"
            :class="{ 'input-error': !passwordsMatch && user.passwordRepeat, 'input-success': passwordsMatch }"
            v-model="user.password" placeholder="Senha" required>
        </div>
        <div class="form-group">
          <input type="password" id="password-repeat" v-model="user.passwordRepeat" placeholder="Repita a Senha" required
            @input="passwordsMatch = doPasswordsMatch"
            :class="{ 'input-error': !passwordsMatch && user.passwordRepeat, 'input-success': passwordsMatch }">
          <p v-if="passwordsMatch && user.passwordRepeat" class="success-text">Senhas correspondem!</p>
          <p v-if="!passwordsMatch && user.passwordRepeat" class="error-text">Senhas não correspondem!</p>
        </div>
        <div class="default-separator"></div>


        <div class="progress-container">
          <div class="progress-bar" :class="{ 'progress-complete': successCounter === 3 }"
            :style="{ width: progressBarWidth }"></div>
        </div>
        <div class="form-group">
          <button type="submit" :disabled="successCounter !== 3">Registrar</button>
          <div v-if="isLoading" class="spinner"></div>
          <p v-if="registrationSuccess" class="success-message">Usuário adicionado com sucesso!</p>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import axios from 'axios';


export default {
  components: {
    DefaultLayout
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        inputClass: '',
      },
      message: '',
      usernameExists: '',
      usernameAccepted: '',
      emailExists: '',
      emailAccepted: '',
      isLoading: false, // Controls Spinner Animation      
      registrationSuccess: false,
      passwordsMatch: false, // To check if the repeated passwords are the same
      successCounter: 0

    };
  },
  computed: {
    doPasswordsMatch() {
      if (this.user.password === this.user.passwordRepeat && this.user.password.length > 0 && this.user.passwordRepeat.length > 0) {
        return true;
      }
      return false;
    },
    progressBarWidth() {
      return `${(this.successCounter / 3) * 100}%`; // Converte o counter para porcentagem
    }
  },
  watch: {
    emailAccepted(newVal) {
      if (newVal) {
        this.increaseCounter();
      } else {
        this.decreaseCounter();
      }
    },
    passwordsMatch(newVal) {
      if (newVal) {
        this.increaseCounter();
      } else {
        this.decreaseCounter();
      }
    },
    usernameAccepted(newVal) {
      if (newVal) {
        this.increaseCounter();
      } else {
        this.decreaseCounter();
      }
    }
  },

  methods: {
    resetUsernameChecks() {
      if (!this.user.username.trim()) {
        this.usernameExists = false;
        this.usernameAccepted = false;
        this.decreaseCounter(); // Se necessário, reduzimos o contador para refletir a mudança
      }
    },

    resetEmailChecks() {
      if (!this.user.email.trim()) {
        this.emailExists = false;
        this.emailAccepted = false;
        this.decreaseCounter(); // Se necessário, reduzimos o contador para refletir a mudança
      }
    },
    increaseCounter() {
      if (this.successCounter < 3) {
        this.successCounter++;
      }
    },
    decreaseCounter() {
      if (this.successCounter > 0) {
        this.successCounter--;
      }
    },
    cleanForm() {
      this.user.username = '';
      this.user.email = '';
      this.user.password = '';
      this.usernameExists = false;
      this.usernameAccepted = false;
      this.emailExists = false;
      this.emailAccepted = false;
    },
    async checkUsername() {
      if (this.user.username.trim()) {
        try {
          const response = await axios.post('http://localhost:4000', {
            query: `
              query GetUserByUsername($username: String!) {
                getUserByUsername(username: $username) {
                  username
                }
              }
            `,
            variables: {
              username: this.user.username
            }
          });

          const existingUsername = response.data.data.getUserByUsername;
          this.usernameExists = !!existingUsername;
          this.usernameAccepted = !this.usernameExists;

        } catch (error) {
          console.error("Erro ao verificar o nome de usuário:", error);
        }
      }
    },
    async checkEmail() {
      if (this.user.email.trim()) {
        try {
          const response = await axios.post('http://localhost:4000', {
            query: `
              query GetUserByEmail($email: String!) {
                getUserByEmail(email: $email) {
                  email
                }
              }
            `,
            variables: {
              email: this.user.email
            }
          });

          const existingEmail = response.data.data.getUserByEmail;
          this.emailExists = !!existingEmail;
          this.emailAccepted = !this.emailExists;

        } catch (error) {
          console.error("Erro ao verificar o nome de usuário:", error);
        }
      }
    },
    async registerUser() {
      this.isLoading = true; // Activate Spinner

      const REGISTER_USER_MUTATION = `
            mutation registerUser($username: String!, $email: String!, $password: String!) {
              registerUser(input: { username: $username, email: $email, password: $password }) {
                id
                username
                email
              }
            }
        `;

      try {
        const response = await axios.post('http://localhost:4000', {
          query: REGISTER_USER_MUTATION,
          variables: {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });


        // Verify if is there any GRAPHQL errors
        if (response.data.errors) {
          response.data.errors.forEach(err => {
            console.error("Erro do GraphQL:", err.message);
          });
          alert(`Erro ao registrar usuário: ${response.data.errors[0].message}`);
        } else {
          this.registrationSuccess = true;

          this.cleanForm()
          const registeredUser = response.data.data.registerUser;
          console.log(registeredUser);
        }

      } catch (error) {

        // console.error("Erro ao registrar usuário:", error);
        if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach(err => {
            console.error("Detalhe do erro:", err.message);
          });
        }
        alert(`Erro ao registrar usuário: ${error.message}`);
      } finally {
        this.isLoading = false; // Stop spinner after logic process
      }

    }
  }
}
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  width: 30em;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}

.registration-form form {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  border: none;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: rgb(242, 242, 242);
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}


.form-group input.input-error {
  border: 1px solid rgb(152, 57, 57);
  background-color: #ffd8d8;
  color: #572524;
}

.form-group input.input-success {
  border: 1px solid rgb(129, 157, 89);
  background-color: #d7eac1;
  color: #0e3107;
}

.error-text {
  color: rgb(123, 28, 28);
}

.success-text {
  color: rgb(37, 130, 37);
}


.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Estilo para a mensagem de sucesso */
.success-message {
  color: rgb(37, 130, 37);
  text-align: center;
  margin: 20px 0;
}






.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 0.5em;
  margin-bottom: 1em;
}

.progress-bar {
  height: 20px;
  background-color: #808080;
  border-radius: 1em;
  transition: width 0.5s;
  /* Efeito crescente */
}

.progress-complete {
  background-color: rgb(115, 207, 138);
}

button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}
</style>
