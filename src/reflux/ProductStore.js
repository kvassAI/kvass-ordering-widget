import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import utils from 'src/utils';
import Actions from './Actions';

const INITIAL_STATE = {
  products: {},
  totalCount: 0,
  totalSum: 0,
  totalTax: 0,
  selectedProduct: null,
  searchString: ''
};

class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = cloneDeep(INITIAL_STATE);
    this.listenables = Actions;
  }

  onProductReset() {
    this.setState(cloneDeep(INITIAL_STATE));
  }

  onAddProduct(product, addCount = 1) {
    const id = product._id.$oid;
    let copy = {
      item: product,
      count: 0
    };

    // Already in list, just add to internal count
    if (this.state.products[id]) {
      copy = cloneDeep(this.state.products[id]);
    }
    copy.count += addCount;

    const tax = this.state.totalTax + ((copy.item.vat * copy.item.price) * addCount);

    this.setState({
      products: {
        ...this.state.products,
        [id]: copy
      },
      totalCount: this.state.totalCount + addCount,
      totalSum: utils.roundNumber(this.state.totalSum + (copy.item.price * addCount), 2),
      totalTax: utils.roundNumber(tax, 2)
    });
  }

  onSearch(searchString) {
    this.setState({
      searchString
    });
  }

  onRemoveProduct(product, minusCount = -1) {
    const id = product._id.$oid;
    if (!this.state.products[id]) return;

    const copy = cloneDeep(this.state.products[id]);
    const maxRemovable = Math.max(-copy.count, minusCount);

    copy.count += maxRemovable;

    const tax = this.state.totalTax + ((copy.item.vat * copy.item.price) * maxRemovable);

    this.setState({
      products: {
        ...this.state.products,
        [id]: copy.count > 0 ? copy : null // Set to null on last item of product
      },
      totalCount: this.state.totalCount + maxRemovable,
      totalSum: utils.roundNumber(this.state.totalSum + (copy.item.price * maxRemovable), 2),
      totalTax: utils.roundNumber(tax, 2)
    });
  }

  onSelectProduct(product) {
    this.setState({selectedProduct: product});
  }
}

export default ProductStore;
