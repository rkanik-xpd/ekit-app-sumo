<template>
	<div class="text-field">
		<label :for="id">{{ label }}</label>
		<input
			:id="id"
			:type="type"
			:value="value"
			:placeholder="hint"
			:required="required"
			@input="handleInput"
			@keyup="$emit('keyup')"
		/>
		<span v-if="valid !== null" class="icon">
			<img v-if="valid" src="../assets/svg/success.svg" alt="Success Icon" />
			<img v-else src="../assets/svg/error.svg" alt="Error Icon" />
		</span>
	</div>
</template>

<script>
export default {
	name: 'text-field',
	props: {
		label: String,
		value: String,
		hint: String,
		required: Boolean,
		type: {
			type: String,
			default: 'text'
		},
		valid: {
			type: Boolean | null,
			default: null
		}
	},
	data: () => ({
		id: Math.random().toString(36).slice(-6)
	}),
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value)
		}
	},
}
</script>

<style lang='scss' scoped>
	.text-field {
		position: relative;

		label {
			font-size: 13px;
			color: #606f7b;
			display: block;
			line-height: 24px;
		}
		input {
			font-family: Roboto, "sans-serif";
			width: 100%;
			border-radius: 3px;
			padding: 0 1rem;
			height: 44px;
			font-size: 1em;
			font-weight: 500;
			color: #111111;
			border: 1px solid #ccd7e6;
			&::placeholder {
				color: #ccd7e6;
				font-weight: 400;
			}
		}
		.icon {
			position: absolute;
			position: absolute;
			right: 0.9rem;
			bottom: 0.5rem;
		}
	}
</style>