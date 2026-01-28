import { Component, input } from "@angular/core";

@Component({
    selector:'product-info',
    template:`
    <section>
        <h4>Product {{id()}} Info Component (child-routing)</h4>
    </section>`
})
export class ProductInfoComponent{
    id=input()

}