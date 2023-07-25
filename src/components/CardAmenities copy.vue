<template>
    <div class="card-amenities">
        <div class="chip" v-for="amenity in amenities" :key="amenity">
            {{ amenity }}
        </div>
    </div>
</template>
<script>

export default {
    props: {
        amenities: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>
.card-amenities {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 8px;
}

.chip {
    display: inline-block;
    background-color: #f5f5f5;
    color: #333;
    font-size: 0.65em;
    border-radius: 20px;
    padding: 0.4em 1em;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
  