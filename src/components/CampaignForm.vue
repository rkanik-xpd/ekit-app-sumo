<template>
	<div class="campaign-form">
		<perfect-scrollbar class="scrollbar">
			<div v-if="submitSuccess" class="messages">
				<div v-for="(msg, index) in messages" :key="index" v-html="msg"></div>
			</div>

			<div class="messages" v-if="showMessages">
				<div
					:key="index"
					class="message"
					v-for="(msg, index) in messages"
					:class="{success: msg.success, error: !msg.success}"
				>
					<p v-html="msg.message"></p>
				</div>
			</div>

			<form v-if="!submitSuccess" ref="campaign-form">
				<TextField :valid="isValidated('fname')" v-model="data.fname" label="First Name" hint="Wilson" />
				<TextField
					:valid="isValidated('lname')"
					v-model="data.lname"
					label="Last Name"
					hint="Anderson"
				/>
				<TextField
					@keyup="handleKeyUp('email')"
					:valid="isValidated('email')"
					v-model="data.email"
					label="Email Address"
					hint="example@gmail.com"
				/>
				<TextField
					:valid="isValidated('password')"
					v-model="data.password"
					label="Password"
					hint="• • • • • • • •"
					type="password"
				/>
				<TextField
					@keyup="handleKeyUp('code')"
					v-model="data.code"
					label="AppSumo Code"
					hint="• • • •"
					:valid="isValidated('code')"
				/>
				<div class="input-group terms-conditions">
					<input
						:valid="isValidated('email')"
						v-model="termsNConditions"
						type="checkbox"
						id="terms-conditions"
					/>
					<label for="terms-conditions">
						I agree the
						<a href="#">Terms of use</a> and the
						<a href="#">Privacy Policy</a>
					</label>
				</div>
				<button @click="handleSubmit" :disabled="!isFilled || loading">
					Get ElementsKit Access
					<img
						v-if="loading"
						src="../assets/svg/Spinner-1s-44px.svg"
						alt="Loading icon"
					/>
				</button>
			</form>
		</perfect-scrollbar>
		<div class="dot-icons">
			<img src="../assets/svg/dots.svg" alt />
		</div>
	</div>
</template>

<script>
import api from '../api'
import TextField from './TextField'
export default {
	name: 'campaign-form',
	components: {
		TextField
	},
	data: () => ({
		data: {
			fname: "Willson",
			lname: "Anderson",
			email: "name@example.com",
			password: "asdadasdasdasdasd",
			code: "tyakcsfvf"
		},
		messages: [],
		termsNConditions: false,
		showMessages: false,
		submitSuccess: null,
		loading: false
	}),
	created() {
		let path = window.location.pathname.split('/')
		this.data.code = path.length > 1 ? path.pop() : ''
		this.handleKeyUp('code')
	},
	computed: {
		isFilled() {
			return Object.values(this.data).every(v => v.trim() !== '') && this.termsNConditions
		}
	},
	methods: {
		isValidated(name) {
			let m = this.messages.find(m => m.name === name)
			if (m) return m.success
			return null
		},
		async validate(data) {
			return await api.validate({
				inputs: data
			})
		},
		async handleKeyUp(name) {
			let { success, message } = await this.validate({
				[name]: this.data[name]
			})
			let data = { name, success, message: message[0] }
			let ki = this.messages.findIndex(m => m.name === name)
			if (ki === -1) this.messages.push(data)
			else this.messages.splice(ki, 1, data)
		},
		async handleSubmit(e) {
			e.preventDefault()

			this.loading = true
			let { success, message } = await this.validate(this.data)
			let dataKeys = Object.keys(this.data)
			this.messages = message.map((msg, mi) => {
				return {
					success: msg.toLowerCase().includes('success'),
					name: dataKeys[mi],
					message: msg
				}
			})
			if (!success) {
				this.showMessages = true
				this.loading = false
				return
			}
			this.messages = []
			this.showMessages = false

			let res = await api.submit(this.data)
			if (res.success) {
				this.submitSuccess = true
				this.messages = res.message
			}
			else {
				this.submitSuccess = false
				this.showMessages = true
				this.messages = res.message.map(m => ({
					success: m.toLowerCase().includes('success'),
					message: m
				}))
			}
			this.loading = false
		}
	},
}
</script>

<style lang='scss'>
	.campaign-form {
		width: 411px;
		background-color: white;
		font-family: "Roboto", sans-serif;
		box-shadow: 0 -30px 30px 60px rgba(black, 0.05);
		position: relative;
		.scrollbar {
			height: 598px;
		}
		.text-field {
			margin-bottom: 1rem;
		}
		.text-field:last-child {
			margin-bottom: 0;
		}
		form {
			padding: 2rem;
		}
		.terms-conditions {
			display: flex;
			width: 80%;
		}
		input[type="checkbox"] {
			margin-top: 0.2rem;
			margin-right: 1rem;
			min-width: 1.05rem;
		}
		button {
			width: 100%;
			margin-top: 30px;
			position: relative;
			img {
				height: 24px;
				position: absolute;
				right: 1rem;
				top: 50%;
				transform: translate(0, -50%);
			}
		}

		.messages {
			padding: 2rem 2rem 0 2rem;
		}

		.message {
			padding: 0.8rem 1rem;
			border-width: 1px;
			border-style: solid;
			border-radius: 0.2rem;
			margin-bottom: 1rem;
			&.success {
				border-color: #1dca8d;
				color: #1dca8d;
				background-color: rgba(#1dca8d, 0.05);
			}
			&.error {
				border-color: #fe5b5b;
				color: #fe5b5b;
				background-color: rgba(#fe5b5b, 0.05);
			}
		}
		.message:last-child {
			margin-bottom: 0;
		}
		.dot-icons {
			position: absolute;
			bottom: -2rem;
			right: -2rem;
			z-index: -1;
		}
	}
</style>