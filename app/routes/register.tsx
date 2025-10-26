import { Button } from "@/components/ui/button"

const Register: React.FC = () => {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4 text-center">Alege tipul contului</h2>
			<div className="flex flex-col gap-4">
				<button type="button">
					<span className="text-xl font-medium">Sunt Investitor 💼</span>
					<p className="text-sm text-gray-500">
						Descoperă startup-uri promițătoare și investește inteligent.
					</p>
				</button>
				<button type="button">
					<span className="text-xl font-medium">Sunt Startup 🚀</span>
					<p className="text-sm text-gray-500">
						Găsește investitori și resurse pentru a-ți dezvolta afacerea.
					</p>
				</button>
			</div>
			<div className="flex justify-end mt-6">
				<Button>Continuă</Button>
			</div>
		</div>
	)
}

export default Register
