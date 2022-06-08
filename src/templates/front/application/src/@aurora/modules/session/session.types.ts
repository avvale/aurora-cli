import { CommonLang } from '@aurora/modules/lang/lang.types';
import { Account } from '@aurora/modules/iam/iam.types';

export interface Session
{
    me?: Account;
    permissions?: string[];  // set all permissions from AccountPermissions
    langs?: CommonLang[];
}