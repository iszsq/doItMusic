
<script>
	export default {
		props: {
			tag: String,
			mProps: Object,
		},
		render(createElement) {
			return createElement(
				this.tag,
				{
					props: this.mProps
				},
			);
		}
	}
</script>

<style>
</style>
