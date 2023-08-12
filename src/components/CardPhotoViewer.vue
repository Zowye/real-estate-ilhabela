<template>
    <div class="viewer">
        <button class="next-button" @click="nextImage"></button>
        <button class="prev-button" @click="prevImage"></button>

        <router-link :to="`/house_explorer/${id}`">
            <div v-if="isLoading" class="spinner"></div>
            <img name="customImage" :src="currentImage" @mouseover="startAutoSwitch" @mouseleave="stopAutoSwitch"
                :alt="`Image ${currentImageIndex + 1} of ${images.length}`" @load="imageLoaded" />
        </router-link>

        <div class="top-left-buttons">
            <button class="for-sale-button border-half">
                For Sale
            </button>
            <button :class="['tranding-button', statusLevelClass]">
                {{ status_level }}
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        status_level: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            currentIndex: 0,
            heartClicked: false,
            intervalId: null,
            isLoading: true
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
        imageLoaded() {
            this.isLoading = false;
        },
        startAutoSwitch() {
            this.intervalId = setInterval(() => {
                this.nextImage();
            }, 400);
        },
        stopAutoSwitch() {
            clearInterval(this.intervalId);
            this.intervalId = null;
        },
        prevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.isLoading = true; // Reset isLoading
            }
        },
        nextImage() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
                this.isLoading = true; // Reset isLoading
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


.viewer {
    max-width: 100%;
    height: 100%;
    position: relative;
}

.viewer img {
    /* background: linear-gradient(rgba(235, 46, 46, 0), rgba(255, 255, 255, 0.4)); */
    width: 100%;
    height: 100%;
    border-radius: 1.2em;
    object-fit: cover;
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
    position: absolute;
    top: 40%;
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
    left: 0.5em;
}

.next-button {
    background-image: url('../assets/images/next-button.png');
    background-position: center;
    background-repeat: no-repeat;
    right: 0.5em;
}

.for-sale-button,
.tranding-button,
.camera-button,
.heart-button,
.plus-button {
    font-size: 0.6em;
    background-color: var(--card-background);
    border: none;
    cursor: pointer;
    padding: 0.3em 0.6em;
    display: flex;
    border-radius: 1em;

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
    background-color: var(--card-background);
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


.spinner {
    position: absolute;
    border: 4px solid rgba(247, 237, 237, 0.36);
    border-radius: 50%;
    border-top: 4px solid #000;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    top: 45%;
    left: 45%;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  