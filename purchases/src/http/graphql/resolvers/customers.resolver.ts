import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: Customer) {
    return await this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  async resolverReference(reference: { authUserId: string }) {
    return await this.customerService.getCustomerByAuthUserId(
      reference.authUserId,
    );
  }
}
