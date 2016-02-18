/*******************************************************************************
 *  _  _ ___ ___     _ _
 * | \| | __/ __| __| | |__
 * | .` | _|\__ \/ _` | '_ \
 * |_|\_|_| |___/\__,_|_.__/
 *
 * Copyright (c) 2014-2016. The NFSdb project and its contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

package com.nfsdb.io.sink;

import java.io.IOException;

public interface CharSink {
    void flush() throws IOException;

    CharSink put(CharSequence cs);

    CharSink put(char c);

    CharSink put(int value);

    CharSink put(long value);

    CharSink put(float value, int scale);

    CharSink put(double value, int scale);

    CharSink put(boolean value);

    CharSink put(Throwable e);

    CharSink putISODate(long value);

    CharSink putTrim(double value, int scale);
}