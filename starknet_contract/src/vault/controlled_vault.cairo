/// Interface representing `ControlledVault`.
#[starknet::interface]
pub trait IControlledVault<TContractState> {
    /// Deposit funds into the vault.
    fn deposit(ref self: TContractState, amount: u256);

    /// Withdraw funds from the vault (owner only).
    fn withdraw(ref self: TContractState, amount: u256);

    /// Transfer ownership of the vault.
    fn transfer_ownership(ref self: TContractState, new_owner: starknet::ContractAddress);

    /// Retrieve the current vault balance.
    fn get_balance(self: @TContractState) -> u256;

    /// Retrieve the current owner.
    fn get_owner(self: @TContractState) -> starknet::ContractAddress;
}

#[starknet::contract]
mod ControlledVault {
    use core::num::traits::Zero;
    use starknet::storage::*;
    use starknet::{ContractAddress, get_caller_address};

    #[storage]
    struct Storage {
        owner: ContractAddress,
        balance: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        Deposit: Deposit,
        Withdrawal: Withdrawal,
        OwnershipTransferred: OwnershipTransferred,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Deposit {
        from: ContractAddress,
        amount: u256,
    }
    #[derive(Drop, starknet::Event)]
    pub struct Withdrawal {
        to: ContractAddress,
        amount: u256,
    }
    #[derive(Drop, starknet::Event)]
    pub struct OwnershipTransferred {
        old_owner: ContractAddress,
        new_owner: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, initial_owner: ContractAddress) {
        assert(!initial_owner.is_zero(), 'Invalid owner');
        self.owner.write(initial_owner);
        self.balance.write(0);
    }

    #[abi(embed_v0)]
    impl ControlledVaultImpl of super::IControlledVault<ContractState> {
        fn deposit(ref self: ContractState, amount: u256) {
            assert(amount > 0, 'Amount must be > 0');

            let caller = get_caller_address();
            self.balance.write(self.balance.read() + amount);

            self.emit(Deposit { from: caller, amount });
        }

        fn withdraw(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            let owner = self.owner.read();

            assert(caller == owner, 'Caller is not owner');
            assert(amount > 0, 'Amount must be > 0');
            assert(self.balance.read() >= amount, 'Insufficient balance');

            self.balance.write(self.balance.read() - amount);

            self.emit(Withdrawal { to: caller, amount });
        }

        fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
            let caller = get_caller_address();
            let current_owner = self.owner.read();

            assert(caller == current_owner, 'Caller is not owner');
            assert(new_owner.is_zero(), 'Invalid new owner');

            self.owner.write(new_owner);

            self.emit(OwnershipTransferred { old_owner: current_owner, new_owner });
        }

        fn get_balance(self: @ContractState) -> u256 {
            self.balance.read()
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }
    }
}
