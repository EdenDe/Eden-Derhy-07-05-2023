import { ReactComponent as ErrorSvg } from '../../assets/svg/notFound.svg'
import '../ErrorMsg/ErrorMsg.scss'

export default function ErrorMsg({ error, callback }) {
	return (
		<div className='error-msg grid'>
			<ErrorSvg />

			{error ? (
				<>
					<span> {error} </span>
					<button className='btn-try-again' onClick={() => callback()}>
						Load last search
					</button>
				</>
			) : (
				<p>Something went wrong</p>
			)}
		</div>
	)
}
