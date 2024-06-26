/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import type { HTMLAttributes } from 'react';
import { useStyleProps } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import type { Attributes } from './types';

type Props = Attributes & HTMLAttributes< HTMLDivElement >;

const Preview = ( {
	parentClassName,
	sku,
	className,
	style,
}: {
	parentClassName: string;
	sku: string;
	className?: string | undefined;
	style?: React.CSSProperties | undefined;
} ) => (
	<div
		className={ clsx( className, {
			[ `${ parentClassName }__product-sku` ]: parentClassName,
		} ) }
		style={ style }
	>
		{ __( 'SKU:', 'woocommerce' ) } <strong>{ sku }</strong>
	</div>
);

const Block = ( props: Props ): JSX.Element | null => {
	const { className } = props;
	const styleProps = useStyleProps( props );
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const sku = product.sku;

	if ( props.isDescendentOfSingleProductTemplate ) {
		return (
			<Preview
				parentClassName={ parentClassName }
				className={ className }
				sku={ 'Product SKU' }
			/>
		);
	}

	if ( ! sku ) {
		return null;
	}

	return (
		<Preview
			className={ className }
			parentClassName={ parentClassName }
			sku={ sku }
			{ ...( props.isDescendantOfAllProducts && {
				className: clsx(
					className,
					'wc-block-components-product-sku wp-block-woocommerce-product-sku',
					styleProps.className
				),
				style: {
					...styleProps.style,
				},
			} ) }
		/>
	);
};

export default withProductDataContext( Block );
