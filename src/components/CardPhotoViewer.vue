<template>
    <div class="card-photo-viewer">
        <div class="viewer">
            <img :src="currentImage" alt="Card Image">
            <!-- Botões no canto superior esquerdo -->
            <div class="top-left-buttons">
                <button class="for-sale-button border-half">
                    For Sale
                </button>
                <button :class="['tranding-button', statusLevelClass]">
                    {{ status_level }}
                </button>
            </div>

            <!-- Botão no canto superior direito -->
            <button class="camera-button border-half">
                <i class="material-icons-outlined">camera_alt</i> 4
            </button>

            <!-- Botões no canto inferior direito -->
            <div class="bottom-right-buttons">
                <button class="heart-button border-circled" :class="{ 'heart-clicked': heartClicked }" @click="toggleHeart">
                    <i class="material-icons-outlined">favorite_border</i>
                </button>
                <button class="plus-button border-circled">
                    <i class="material-icons-outlined">add</i>
                </button>
            </div>
        </div>
        <!-- <div class="controls">
  
      </div> -->
    </div>
</template>
  
<script>
export default {
    props: ['images', 'status_level'],
    data() {
        return {
            currentIndex: 0,
            heartClicked: false,
        };
    },
    computed: {
        currentImage() {
            return this.images[this.currentIndex];
        },
        statusLevelClass() {
            if (this.status_level === 'Novo') {
                return 'status-new';
            } else if (this.status_level === 'Antigo') {
                return 'status-old';
            } else if (this.status_level === 'Em Alta') {
                return 'status-trending';
            } else {
                return '';
            }
        },
        statusLevelIconClass() {
            if (this.status_level === 'Novo') {
                console.log("novoss")
                return 'icon-new';
            } else if (this.status_level === 'Antigo') {
                return 'icon-old';
            } else if (this.status_level === 'Em Alta') {
                return 'icon-trending';
            } else {
                return '';
            }
        },
    },
    methods: {
        prevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        nextImage() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
            }
        },
        toggleHeart() {
            this.heartClicked = !this.heartClicked;
        },
    }
};
</script>
  
<style scoped>
.heart-button i {
    margin-top: 2px;
    color: gray;
}

.card-photo-viewer {
    margin-bottom: -4px;
    position: relative;
}

.viewer {
    position: relative;
}

.controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.prev-button,
.next-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 80px;
}

.prev-button {
    background-image: url('@/assets/images/prev-button.png');
    background-position: center;
    background-repeat: no-repeat;
}

.next-button {
    background-image: url('../assets/images/next-button.png');
    background-position: center;
    background-repeat: no-repeat;
}

.for-sale-button,
.tranding-button,
.camera-button,
.heart-button,
.plus-button {
    font-size: 0.8em;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    display: flex;
    align-items: center;
    color: var(--cor-text-base);
}

.border-half {
    border-radius: 0.89em;
}

.border-circled {
    border-radius: 50%;
    width: 2.3em;
    height: 2.3em;
}

/* Posicionamento dos botões */
.top-left-buttons {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    gap: 10px;
}

.camera-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 0.7em;
    color: var(--cor-base);
}

.bottom-right-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
}

/* Estilos para os ícones */
.for-sale-button i,
.tranding-button i,
.plus-button i {
    font-size: 1.2em;
}

.camera-button i,
.heart-button i {
    font-size: 1.8em;
}


.heart-button i {
    margin-top: 2px;
}

.heart-button,
.plus-button {
    /* Rest of the styles */
    display: flex;
    align-items: center;
    justify-content: center;
}

.plus-button {
    /* Rest of the styles */
    color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}


/* Estilos para os ícones do Material Icons */
.heart-button i.material-icons-outlined {
    font-size: 1.8em;
    margin-top: 2px;
    color: gray;
    /* Cor padrão para o ícone */
}

/* Estilos para o ícone do coração quando está selecionado */
.heart-clicked i.material-icons-outlined {
    color: red;
    /* Cor do ícone quando o coração está selecionado */
}





/* Estilos para o botão tranding-button com base no status_level */
.tranding-button {
    font-size: 0.8em;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    display: flex;
    border-radius: 1em;
    align-items: center;
    justify-content: center;
    color: var(--cor-text-base);
}

.status-new {
    background-color: #21c975;
    color: #ffffff;
}

.status-old {
    background-color: #ffefa8;
    color: #000000;
}

.status-trending {
    background-color: #ea5c09;
    color: #ffffff;
}

/* Estilos para os ícones do Material Icons */
.material-icons-outlined {
    font-size: 1.8em;
    margin-top: 2px;
}

.icon-new {
    color: #ffffff;
    /* Cor verde limão para o ícone */
}

.icon-old {
    color: #000000;
    /* Cor preta para o ícone */
}

.icon-trending {
    color: #ffffff;
    /* Cor laranja escuro para o ícone */
}
</style>
  